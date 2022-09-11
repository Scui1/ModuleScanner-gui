import {Pattern} from "../json/scanrequest/Pattern";
import {Action} from "../json/scanrequest/Action";
import notifier from "../components/Notifications/Notifier";

export module PatternExporter {
    export function exportPatternToClipBoard(moduleName: string, pattern: Pattern) {
        navigator.clipboard.writeText(`${moduleName}->${actionsToString(pattern.actions)}`).then(() => {
            notifier.success("Copied to clipboard.");
        })
    }

    function actionsToString(actions: Action[]): string {
        return actions.map(action => {
            const stringifiedArguments = action.arguments.join(", ");
            return `${action.type}(${stringifiedArguments})`;
        }).join(".");
    }
}