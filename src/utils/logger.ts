import EventEmitter from 'events';

interface ILoggerConfig {
  color: string;
  method: keyof Console;
  type: 'info' | 'warn' | 'error' | 'success' | 'debug';
}

export const logger = new EventEmitter();

const logLevels: ILoggerConfig[] = [
  { type: 'info', color: '\x1b[36m', method: 'log' },
  { type: 'warn', color: '\x1b[33m', method: 'warn' },
  { type: 'error', color: '\x1b[31m', method: 'error' },
  { type: 'success', color: '\x1b[34m', method: 'log' },
  { type: 'debug', color: '\x1b[32m', method: 'log' },
];

const formatTime = (): string => {
  return new Date().toISOString();
};

logLevels.forEach(level => {
  logger.on(level.type, (message) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const method = console[level.method] as Function;
    method(`${level.color}[${level.type.toUpperCase()}]\x1b[0m [${formatTime()}]:`, message);
  });
});