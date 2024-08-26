import React, { ChangeEvent, KeyboardEvent, Component } from "react";

export class InputView extends Component<{
    placeholder?: string;
    type?: string;
    className?: string;
    value?: string;
    autoFocus?: boolean;
    required?: boolean;
    autoComplete?: string;
    onChange?(value: string): void;
    onKeyDown?(keyCode: string): void;
    onKeyUp?(keyCode: string): void;
}> {
    render() {
        return <input
            className={"InputView" + (this.props.className ? " " + this.props.className : "")}
            type={this.props.type}
            value={this.props.value}
            placeholder={this.props.placeholder}
            autoFocus={this.props.autoFocus}
            required={this.props.required}
            autoComplete={this.props.autoComplete}
            onInput={(event: ChangeEvent<HTMLInputElement>) => this.props.onChange?.(event.target.value)}
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => this.props.onKeyDown?.(event.code)}
            onKeyUp={(event: KeyboardEvent<HTMLInputElement>) => this.props.onKeyUp?.(event.code)}
        />;
    }
}