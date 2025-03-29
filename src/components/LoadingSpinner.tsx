import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingSpinner({ size = 40 }: { size?: number }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <CircularProgress size={size} />
    </Box>
  );
}
