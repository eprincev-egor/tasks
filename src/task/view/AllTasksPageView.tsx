import React from "react";

export class AllTasksPageView extends React.Component {

    render() {
        return <html lang="en">
            <head>
                <meta charSet="utf8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>All tasks</title>
                <link rel="stylesheet" href="/AllTasksPageView.css" />
            </head>
            <body>
                <div className="AllTasksPageView">
                    <h1 className="AllTasksPageView--title">All tasks</h1>
                </div>

                <script src="/main.allTasks.js"></script>
            </body>
        </html>;
    }
}