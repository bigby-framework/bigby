import React from "react";
import { Pane, Area } from "./ui";

const WelcomePane: React.FC = () => (
  <Pane title="Welcome!" flex="0 0 200px">
    <Area>
      <p>
        Welcome, friend! This is a little thing I'm building. More information
        soon. -{" "}
        <a href="https://twitter.com/hmans" target="_blank">
          @hmans
        </a>
      </p>
    </Area>
  </Pane>
);

export { WelcomePane };
