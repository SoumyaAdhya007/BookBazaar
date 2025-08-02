import winston from "winston";
import env from "./env.config.js";
const { combine, timestamp, printf, colorize, align } = winston.format;
const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};
const fileFormat = combine(
  colorize({ all: true }),
  timestamp({
    format: "YYYY-MM-DD hh:mm:ss.SSS A",
  }),
  align(),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);
const logger = winston.createLogger({
  levels: logLevels,
  level: env.LOG_LEVEL ?? "info",
  format: fileFormat,
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

if (env.NODE_ENV === "development") {
  logger.add(
    new winston.transports.Console({
      format: fileFormat,
    })
  );
}

export default logger;
