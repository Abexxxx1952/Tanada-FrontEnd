import { Button } from "@/srcApp/shared/ui/button";

type LoginButtonProps = {
  onClickHandler: () => void;
};

export function LoginButton({ onClickHandler }: LoginButtonProps) {
  return (
    <Button
      onClick={onClickHandler}
      text="Login"
      textColor="white"
      backgroundColor="var(--logoColor)"
      focusBackgroundColor="var(--logoColor)"
    />
  );
}
