export interface WelcomeModalInterface {
  name: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}
