type LogLevel = 'info' | 'warn' | 'error';

const log = (level: LogLevel, msg: string, meta?: object) => {
  const entry = JSON.stringify({
    level,
    msg,
    ts: new Date().toISOString(),
    ...meta,
  });
  if (level === 'error') {
    console.error(entry);
  } else {
    console.log(entry);
  }
};

export const logger = {
  info:  (msg: string, meta?: object) => log('info', msg, meta),
  warn:  (msg: string, meta?: object) => log('warn', msg, meta),
  error: (msg: string, meta?: object) => log('error', msg, meta),
};
