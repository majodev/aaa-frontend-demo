import styled from "styled-components";
import * as mui from "material-ui";

export const RelativeWrapper = styled.div`
    position: relative;
`;

// Expose needed material-ui svg icons...
type MuiSVGIconConstructor = new () => mui.SvgIcon;

export const IconDone: MuiSVGIconConstructor = require("material-ui/svg-icons/action/done").default;
export const IconRestore: MuiSVGIconConstructor = require("material-ui/svg-icons/action/restore").default;
export const IconLeft: MuiSVGIconConstructor = require("material-ui/svg-icons/navigation/chevron-left").default;
export const IconRight: MuiSVGIconConstructor = require("material-ui/svg-icons/navigation/chevron-right").default;
export const IconThumbUp: MuiSVGIconConstructor = require("material-ui/svg-icons/action/thumb-up").default;
