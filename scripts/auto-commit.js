import { execSync } from "child_process";

try {
  // Añadir todos los cambios
  execSync("git add .", { stdio: "inherit" });

  // Crear el commit con mensaje predefinido
  const commitMessage =
    "feat(general): actualización automática\n\ncambios realizados automáticamente";
  execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });

  console.log("✅ Commit realizado automáticamente");
} catch (error) {
  console.error("❌ Error al realizar el commit:", error.message);
  process.exit(1);
}
