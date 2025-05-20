import { useAuthBackgroundStore } from '@/store/auth/authStore';

export const AuthBackgroundImage = () => {
  const { backgroundImage } = useAuthBackgroundStore();

  return (
    <div className="fixed inset-0 -z-10">
      <img
        src={backgroundImage}
        alt="Auth Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};
