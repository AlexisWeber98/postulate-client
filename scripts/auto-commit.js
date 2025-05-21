import { execSync } from 'child_process';
import readline from 'readline';

try {
  // Obtener los cambios pendientes
  const status = execSync('git status --porcelain', { encoding: 'utf-8' });

  // Determinar qué archivos incluir basado en los argumentos
  const patterns = process.argv.slice(2);
  const filesToStage = patterns.length > 0 ? patterns.join(' ') : '.';

  // Mostrar los cambios y pedir confirmación
  console.log('Archivos a ser incluidos en el commit:');
  console.log(status);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(`¿Deseas incluir los cambios en ${filesToStage}? (s/n): `, answer => {
    if (answer.toLowerCase() === 's') {
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
      const commitMessage = `${commitType}(update): actualización de código\n\nDescripción: Actualización automática de archivos\n\nCambios realizados:\n${changes}`;

      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

      console.log('✅ Commit realizado automáticamente');
    } else {
      console.log(
        '❌ Commit cancelado. Por favor, selecciona los archivos manualmente e intenta nuevamente.'
      );
    }
    rl.close();
  });
} catch (error) {
  console.error('❌ Error al realizar el commit:', error.message);
  process.exit(1);
}
