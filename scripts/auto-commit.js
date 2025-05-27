import { execSync, spawnSync } from 'child_process';
import readline from 'readline';

// Configuración de mensajes por idioma
const messages = {
  en: {
    update: 'code update',
    description: 'Description',
    automatic: 'Automatic file update',
    changes: 'Changes made',
    filesToInclude: 'Files to be included in commit',
    confirmQuestion: 'Do you want to include changes in',
    commitSuccess: '✅ Commit completed successfully',
    commitCancelled: '❌ Commit cancelled. Please select files manually and try again.',
    error: '❌ Error performing commit',
    noChanges: 'No changes to commit',
  },
  es: {
    update: 'actualización de código',
    description: 'Descripción',
    automatic: 'Actualización automática de archivos',
    changes: 'Cambios realizados',
    filesToInclude: 'Archivos a ser incluidos en el commit',
    confirmQuestion: '¿Deseas incluir los cambios en',
    commitSuccess: '✅ Commit realizado automáticamente',
    commitCancelled:
      '❌ Commit cancelado. Por favor, selecciona los archivos manualmente e intenta nuevamente.',
    error: '❌ Error al realizar el commit',
    noChanges: 'No hay cambios para commitear',
  },
};

// Obtener el idioma preferido (por defecto: inglés)
const getLanguage = () => {
  const lang = process.env.COMMIT_LANG || 'en';
  return messages[lang] || messages.en;
};

try {
  // Obtener los cambios pendientes
  const status = execSync('git status --porcelain', { encoding: 'utf-8' });

  // Verificar si hay cambios para commitear
  if (!status.trim()) {
    process.exit(0);
  }

  // Determinar qué archivos incluir basado en los argumentos
  const patterns = process.argv.slice(2);
  const filesToStage = patterns.length > 0 ? patterns.join(' ') : '.';

  // Obtener mensajes en el idioma configurado
  const lang = getLanguage();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(`${lang.confirmQuestion} ${filesToStage}? (s/n): `, answer => {
    if (['s', 'y'].includes(answer.toLowerCase())) {
      // Añadir los cambios especificados
      execSync(`git add ${filesToStage}`, { stdio: 'inherit' });

      // Crear el mensaje del commit con los cambios específicos
      const changes = status
        .split('\n')
        .filter(line => line.trim())
        .map(line => {
          const [status, file] = line.split(' ').filter(Boolean);
          return `- ${file} (${status})`;
        })
        .join('\n');

      // Determinar el tipo de cambio basado en los archivos modificados
      const getCommitType = changes => {
        const lowerChanges = changes.toLowerCase();

        // Dependencias y configuración
        if (
          lowerChanges.includes('package.json') ||
          lowerChanges.includes('package-lock.json') ||
          lowerChanges.includes('yarn.lock') ||
          lowerChanges.includes('tsconfig.json')
        ) {
          return 'chore';
        }

        // Tests
        if (
          lowerChanges.includes('test') ||
          lowerChanges.includes('spec') ||
          lowerChanges.includes('.test.') ||
          lowerChanges.includes('__tests__')
        ) {
          return 'test';
        }

        // Documentación
        if (
          lowerChanges.includes('docs') ||
          lowerChanges.includes('readme') ||
          lowerChanges.includes('.md') ||
          lowerChanges.includes('documentation')
        ) {
          return 'docs';
        }

        // Correcciones de bugs
        if (
          lowerChanges.includes('fix') ||
          lowerChanges.includes('bug') ||
          lowerChanges.includes('error') ||
          lowerChanges.includes('issue')
        ) {
          return 'fix';
        }

        // Estilos y CSS
        if (
          lowerChanges.includes('style') ||
          lowerChanges.includes('css') ||
          lowerChanges.includes('scss') ||
          lowerChanges.includes('less')
        ) {
          return 'style';
        }

        // Refactorización
        if (
          lowerChanges.includes('refactor') ||
          lowerChanges.includes('restructure') ||
          lowerChanges.includes('reorganize')
        ) {
          return 'refactor';
        }

        // Mejoras de rendimiento
        if (
          lowerChanges.includes('perf') ||
          lowerChanges.includes('performance') ||
          lowerChanges.includes('optimize')
        ) {
          return 'perf';
        }

        // Características nuevas
        if (
          lowerChanges.includes('feat') ||
          lowerChanges.includes('feature') ||
          lowerChanges.includes('add') ||
          lowerChanges.includes('new')
        ) {
          return 'feat';
        }

        // Por defecto, asumimos que es una característica nueva
        return 'feat';
      };

      const commitType = getCommitType(changes);
      const commitMessage = `${commitType}(update): ${lang.update}\n\n${lang.description}: ${lang.automatic}\n\n${lang.changes}:\n${changes}`;

      const commitResult = spawnSync('git', ['commit', '-m', commitMessage], { stdio: 'pipe' });
      if (commitResult.status !== 0) {
        console.error(`${lang.error}: ${commitResult.stderr.toString()}`);
        process.exit(1);
      }
    } else {
    }
    rl.close();
  });
} catch (error) {
  const safeLang = getLanguage();
  console.error(`${safeLang.error}:`, error.message);
  process.exit(1);
}
