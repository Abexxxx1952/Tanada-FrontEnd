import { Button } from "@/srcApp/shared/ui/button";

type LoginButtonProps = {
  onClickHandler: () => void;
  loading: boolean;
  disabled: boolean;
};

export function LoginButton({
  onClickHandler,
  loading,
  disabled,
}: LoginButtonProps) {
  return (
    <Button
      onClick={onClickHandler}
      text="Login"
      textColor="white"
      backgroundColor="var(--logoColor)"
      focusTextColor="white"
      focusBackgroundColor="var(--buttonLoginBackgroundColor)"
      boxShadow="var(--buttonBoxShadow)"
      loading={loading}
      disabled={disabled}
    />
  );
}
