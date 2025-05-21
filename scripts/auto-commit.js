import { execSync } from 'child_process';
import readline from 'readline';

try {
  // Obtener los cambios pendientes
  const status = execSync('git status --porcelain', { encoding: 'utf-8' });

  // Mostrar los cambios y pedir confirmación
  console.log('Archivos a ser incluidos en el commit:');
  console.log(status);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('¿Deseas incluir todos estos cambios en el commit? (s/n): ', answer => {
    if (answer.toLowerCase() === 's') {
      // Añadir todos los cambios
      execSync('git add .', { stdio: 'inherit' });

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
        if (changes.includes('package.json')) return 'chore';
        if (changes.includes('test') || changes.includes('spec')) return 'test';
        if (changes.includes('docs') || changes.includes('README')) return 'docs';
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
