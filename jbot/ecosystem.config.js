module.exports = {
    apps: [{
        name: "jbot",
        cwd: "..",
        script: "python",
        args: "-m jbot",
        autorestart: true,
        watch: ["jbot"],
        ignore_watch: [
            "jbot/__pycache__/*",
            "jbot/bot/__pycache__/*",
            "jbot/diy/__pycache__/*",
            "jbot/*.log"
        ],
        watch_delay: 15000,
        interpreter: ""
    }]
}