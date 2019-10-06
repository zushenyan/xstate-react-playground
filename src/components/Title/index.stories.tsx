import React, { ReactElement } from "react";
import { storiesOf } from "@storybook/react";
import Title from "./index";

storiesOf("Title", module)
  .add("initial props", (): ReactElement => <Title>Hello World</Title>)
  .add("with text", () => <Title textColor="blue">Hello World</Title>);
