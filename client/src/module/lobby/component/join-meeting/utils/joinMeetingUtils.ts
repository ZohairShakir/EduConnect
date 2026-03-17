export const joinMeetingUtils = () => {
  const handlemeetingIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw: string = e.target.value;
    const cleaned = raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 8);
    // Format as XXXX-XXXX for readability
    const withDash =
      cleaned.length <= 4 ? cleaned : `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    return withDash;
  };

  const validatemeetingId = (inputRoom: string) => {
    const cleaned = inputRoom.replace(/[^a-zA-Z0-9]/g, "");
    return cleaned.length === 8;
  };

  return { handlemeetingIdChange, validatemeetingId };
};
