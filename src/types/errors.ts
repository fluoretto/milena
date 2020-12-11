import { Module, Service } from ".";

export interface ErrorContext {
  originService: Service;
  originModule: Module;
  additionalContext?: any;
}

export class MilenaError extends Error {
  isMilenaError = true;

  context: ErrorContext;
  statusCode: number = 500;
}

export class FlowNotStarted extends MilenaError {
  constructor(message: any, context: ErrorContext) {
    super(message);

    this.name = "FlowNotStarted";
    this.statusCode = 401;
    this.context = context;
  }
}

export class CodeDoesntMatch extends MilenaError {
  constructor(message: any, context: ErrorContext) {
    super(message);

    this.name = "CodeDoesntMatch";
    this.statusCode = 401;

    this.context = context;
  }
}

export class TokenExpired extends MilenaError {
  constructor(message: any, context: ErrorContext) {
    super(message);

    this.name = "TokenExpired";
    this.statusCode = 401;

    this.context = context;
  }
}

export class TokenFlooded extends MilenaError {
  constructor(message: any, context: ErrorContext) {
    super(message);

    this.name = "TokenFlooded";
    this.statusCode = 401;

    this.context = context;
  }
}

export class InternalError extends MilenaError {
  constructor(message: any, context: ErrorContext) {
    super(message);

    this.name = "InternalError";
    this.statusCode = 500;

    this.context = context;
  }
}

export class IncorrectArgsError extends MilenaError {
  constructor(message: any, context: ErrorContext) {
    super(message);

    this.name = "MissingArgsError";
    this.statusCode = 403;

    this.context = context;
  }
}

export class NoPermissionError extends MilenaError {
  constructor(message: any, context: ErrorContext) {
    super(message);

    this.name = "NoPermissionError";
    this.statusCode = 403;

    this.context = context;
  }
}

const errors = {
  FlowNotStarted,
  CodeDoesntMatch,
  TokenExpired,
  TokenFlooded,
  InternalError,
  IncorrectArgsError,
  NoPermissionError,
};

export default errors;
