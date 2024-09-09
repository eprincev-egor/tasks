import React from "react";

export abstract class AbstractPageView<TProperties extends {model: any}>
    extends React.Component<TProperties> {

    protected model = this.props.model;
    protected abstract renderContent(): React.ReactNode;
    protected abstract title: string;
    protected abstract jsBundleName: string;
    protected abstract cssBundleName: string;

    render() {
        return <html lang="en">
            <head>
                <meta charSet="utf8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>{this.title}</title>
                <link rel="stylesheet" href={`/${this.cssBundleName}.css`} />
            </head>
            <body>
                <div className="AbstractPageView">
                    <h1 className="AbstractPageView--title">{this.title}</h1>
                    {this.renderContent()}
                </div>

                <script dangerouslySetInnerHTML={{
                    __html: "window.rootModel = " + JSON.stringify(this.model)
                        .replaceAll(/<\s*\/\s*script\s*>/gi, "<\\/script>")
                }}></script>
                <script src={`/${this.jsBundleName}.js`}></script>
            </body>
        </html>;
    }
}
