import { IconButton } from "./button";
import { ErrorBoundary } from "./error";
import styles from "./mcp-market.module.scss";
import CloseIcon from "../icons/close.svg";
import { Modal } from "./ui-lib";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";

export function McpMarketPage() {
  const navigate = useNavigate();

  return (
    <ErrorBoundary>
      <div className={styles["mcp-market"]}>
        <div className={styles["mcp-market-header"]}>
          <div className={styles["mcp-market-title"]}>MCP Market</div>
          <IconButton
            icon={<CloseIcon />}
            onClick={() => navigate(Path.Home)}
          />
        </div>
        <div className={styles["mcp-market-content"]}>
          <div className={styles["mcp-market-disabled"]}>
            MCP (Model Context Protocol) features are not available in the
            desktop app. Please use the web version to access MCP features.
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
