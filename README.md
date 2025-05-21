# Postulate Client

Aplicación de gestión de postulaciones laborales.

## Instalación

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm (incluido con Node.js)
- Git

### Pasos de instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/postulate-client.git
cd postulate-client
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones locales.

4. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia la aplicación en modo producción
- `npm run test`: Ejecuta las pruebas
- `npm run lint`: Ejecuta el linter
