const exe_name = "bun main.ts";

export const MAIN_HELP_MESSAGE = `
Wordwall hacks command line app

Usage:
${exe_name} submit <ID> <NAME> <TIME> <SCORE> <MODE> <TEMPLATE> ?> --many <TIMES> <?> ...<ARG:VALUE> <?

ID - Problem ID as (found in url)
NAME - Name for submission shown on leaderboard
TIME - Time for submission in milliseconds
SCORE - Score for submission
MODE - Activity mode ie. quiz, airplane. Starts from 0 for first activity
TEMPLATE - Template id (mode of play) for specified activity. Run --help submit for more info
ARG : VALUE - Extra arguments ie. score for quiz show. This isn't implemented yet`;

const SUBMIT_HELP_MESSAGE = `
Submit a time to the leaderboard of a wordwall challenge: templateids for every game are specified below.
Games marked with * require extra arguments.

maze_chase = 49
*quiz = 5
game_quiz = 69
open_box = 30
random_wheel = 8
anagram = 38
crossword = 11
find_the_match = 46
hangman = 73
match_up = 3
matching_pairs = 25
airplane = 48
unjumble = 72
`;

export const HELP_MESSAGES = new Map([
    ["submit", SUBMIT_HELP_MESSAGE],
    ["check", "checking the leaderboard is not implemented yet, sorry!"],
]);

export const PARSE_ERROR = `
Parse error: ID, TIME, SCORE, MODE, and TEMPLATE must be valid integers
`

export function report(response: Response) {
    if (response.ok && response.status == 200) {
        console.log(`Success! Double check all IDs are correct.`)
    } else {
        console.log("Error, response is:\n", response);
    }
}

export function reportNonVerbose(response: Response) {
    if (response.ok && response.status == 200) {
        console.log(`Success!`);
    } else {
        console.log("Error, response is:\n", response);
    }
}