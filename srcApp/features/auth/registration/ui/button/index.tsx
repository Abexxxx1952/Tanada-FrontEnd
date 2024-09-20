import { Button } from "@/srcApp/shared/ui/button";

type RegistrationButtonProps = {
  onClickHandler: () => void;
  loading: boolean;
  disabled: boolean;
};

export function RegistrationButton({
  onClickHandler,
  loading,
  disabled,
}: RegistrationButtonProps) {
  return (
    <Button
      onClick={onClickHandler}
      text="Registration"
      textColor="white"
      backgroundColor="var(--logoColor)"
      focusBackgroundColor="var(--logoColor)"
      loading={loading}
      disabled={disabled}
    />
  );
}
