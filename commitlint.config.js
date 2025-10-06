module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'feat',     // Nueva feature
          'fix',      // Bug fix
          'docs',     // Documentación
          'style',    // Formato, punto y coma, etc
          'refactor', // Refactorización
          'test',     // Tests
          'chore',    // Tareas de mantenimiento
          'perf',     // Mejoras de performance
          'ci',       // Cambios en CI
          'build',    // Cambios en build
          'revert',   // Revert de un commit
        ],
      ],
      'subject-case': [0],
    },
  };