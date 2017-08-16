requirejs.config({
    baseUrl: 'app/appenders',
    paths: {
        alertWindowAppender: 'AlertWindowAppender',
        consoleAppender: 'ConsoleAppender',
        webApiAppender: 'WebApiAppender',
        windowAppender: 'WindowAppender'
    }
});

define(['AlertWindowAppender', 'ConsoleAppender', 'WebApiAppender', 'WindowAppender'],
    function (AlertWindowAppender, ConsoleAppender, WebApiAppender, WindowAppender) {

        let levels = {
            DEBUG: {
                label: 'DEBUG',
                color: 'blue'
            },
            INFO: {
                label: 'INFO',
                color: 'green'
            },
            WARN: {
                label: 'WARN',
                color: 'orange'
            },
            ERROR: {
                label: 'ERROR',
                color: 'red'
            }
        };

        Logger.prototype = {
            /******* Build-in default appenders *******/
            AlertWindowAppender: AlertWindowAppender,
            ConsoleAppender: ConsoleAppender,
            WebApiAppender: WebApiAppender,
            WindowAppender: WindowAppender,

            appenders: [],

            debug: function (msg) {
                this.logMessage(levels.DEBUG, msg);
            },
            info: function (msg) {
                this.logMessage(levels.INFO, msg);
            },
            warn: function (msg) {
                this.logMessage(levels.WARN, msg);
            },
            error: function (msg) {
                this.logMessage(levels.ERROR, msg);
            },

            addAppender: function (appender) {
                if (appender)
                    this.appenders.push(appender);
            },

            logMessage: function logMessage(level, msg) {
                for (let i in this.appenders) {
                    try {
                        this.appenders[i].log(level, msg);
                    } catch (e) {
                        this.handleException(e)
                    }
                }
            },

            handleException: function (errorMsg, url, lineNumber) {
                console.log("[Unhandled error]: " + errorMsg);
            }
        };

        function Logger() {
            window.onerror = (errorMsg, url, lineNumber) => {
                this.handleException(errorMsg, url, lineNumber);
                return true;
            }
        }

        return Logger;
    });
