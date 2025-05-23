export const AuthBackgroundImage = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="w-full h-full bg-[url('/images/auth-background.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};
