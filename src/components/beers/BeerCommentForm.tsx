import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";

import * as i18n from "../../i18n/util";
import * as mui from "material-ui";
import * as _ from "lodash";
import beersState from "../../state/beersState";
import * as primitives from "../util/primitives";

interface IProps {
    id: number;
}
interface IState {
    commentText: string;
    isChanged: boolean;
    errorText: string | null;
}

function getInitialState(props: IProps): IState {

    const commentText = beersState.commentsMap.get(`${props.id}`) || "";

    return {
        commentText,
        isChanged: false,
        errorText: null
    };
}

@observer
export default class Component extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = getInitialState(props);
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (this.props.id !== nextProps.id) {
            this.setState(getInitialState(nextProps));
        }
    }

    handleChange = (e: React.ChangeEvent<{ value: string }>) => {
        console.log(e);
        console.log(e.target.value);
        const commentText = e.target.value;
        let errorText = null;

        // validations!
        if (commentText !== _.trimStart(commentText)) {
            errorText = "Comment should not start with an space";
        } else if (commentText !== _.trimEnd(commentText)) {
            errorText = "Comment should not end with an space";
        } else if (commentText.length > 35) {
            errorText = "Should not be larger than 35.";
        } else if (commentText.indexOf("  ") !== -1) {
            errorText = "no double spaces!";
        }

        this.setState({
            commentText,
            isChanged: true,
            errorText
        });
    }

    onSubmit = (e: React.FormEvent<any>) => {
        e.preventDefault();

        if (this.state.isChanged === false
            || this.state.errorText !== null) {
            // noop
            return;
        }

        if (this.state.commentText === "") {
            beersState.deleteComment(this.props.id);
        } else {
            beersState.addComment(this.props.id, this.state.commentText);
        }

        this.setState({
            isChanged: false
        });

        console.log("form submit", this.state.commentText);
    }

    render() {

        return (
            <form onSubmit={this.onSubmit} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <mui.TextField
                    id="text-field-controlled"
                    value={this.state.commentText}
                    onChange={this.handleChange}
                    errorText={this.state.errorText}
                />
                <mui.FlatButton
                    label="submit"
                    onTouchTap={this.onSubmit}
                    disabled={!this.state.isChanged}
                    icon={<primitives.IconSend color="red" />}
                />
            </form>
        );

    }
}
