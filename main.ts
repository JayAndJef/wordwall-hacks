import { exit } from "process";
import {
    HELP_MESSAGES,
    MAIN_HELP_MESSAGE,
    PARSE_ERROR,
    report,
    reportNonVerbose,
} from "./outputs";

function send_req(
    score: number,
    time: number,
    name: string,
    mode: number,
    id: number,
    templateId: number
) {
    return fetch(
        `https://wordwall.net/leaderboardajax/addentry?score=${score}&time=${time}&name=${name}&mode=${mode}&activityId=${id}&templateId=${templateId}`,
        { method: "GET" }
    );
}

const args = process.argv;

if (args[2] == "--help") {
    const help_text = args[3];
    if (!help_text || !HELP_MESSAGES.get(help_text)) {
        // Main help text
        console.log(MAIN_HELP_MESSAGE);
    } else {
        // Get help for command
        console.log(HELP_MESSAGES.get(help_text));
    }
} else if (args.length >= 9 || args[2] == "submit") {
    // This is a call to submit
    const name = args[4];
    const id = parseInt(args[3]);
    const time = parseInt(args[5]);
    const score = parseInt(args[6]);
    const mode = parseInt(args[7]);
    const templateId = parseInt(args[8]);

    if (
        Number.isNaN(id) ||
        Number.isNaN(time) ||
        Number.isNaN(mode) ||
        Number.isNaN(templateId) ||
        Number.isNaN(score)
    ) {
        console.log(PARSE_ERROR);
        exit(1);
    }

    if (args[9] == "--many") {
        if (name != "RAND") {
            console.log("Name must be random for --many!");
            exit(1);
        }
        const num_times = parseInt(args[10]);
        if (Number.isNaN(num_times)) {
            console.log("Times to loop must be valid integer!");
            exit(1);
        }
        for (let step = 0; step < num_times; step++) {
            console.log("Sending request...");
            send_req(
                score,
                time,
                (Math.random() + 1).toString(36).substring(2),
                mode,
                id,
                templateId
            ).then(reportNonVerbose);
        }
    } else if (name == "RAND") {
        console.log("Sending request...");
        send_req(
            score,
            time,
            (Math.random() + 1).toString(36).substring(2),
            mode,
            id,
            templateId
        ).then(report);
    } else {
        console.log("Sending request...");
        send_req(score, time, name, mode, id, templateId).then(report);
    }
} else {
    console.log("unknown command");
}
