import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as mui from "material-ui";

const StyledLink = styled(Link) `
    text-decoration: none;
`;
interface IProps {
    to: string;
    onClick?: () => void; // can be optional
    title?: string; // can be optional first used, then children
    children?: React.ReactNode; // can be optional, used if no title supplied
}

export default function (props: IProps) {
    return (
        <StyledLink to={props.to}>
            <mui.MenuItem onClick={props.onClick}>{props.title || props.children}</mui.MenuItem>
        </StyledLink>
    );
}