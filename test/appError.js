'use strict';

const test = require('unit.js');
const AppError = require('../appError');


describe("Test AppError", () => {
  describe('AppError instanciation', () => {
    let appErr;
    before('create error', () => {
      appErr = new AppError(404, 'This is a not found error');
    });
    it('should create a new AppError instance', () => {
      test.value(appErr).isInstanceOf(AppError);
    });
    it('AppError should have fields errno and error', () => {
      test.object(appErr).contains({
        'errno': 404,
        'error': 'This is a not found error'
      });
    });
  });
  describe('Create AppError from Error', () => {
    let appErr;
    before('create error', () => {
      appErr = AppError.fromError(new Error('Server error'));
    });
    it('should create a new AppError instance', () => {
      test.value(appErr).isInstanceOf(AppError);
    });
    it('AppError should have fields errno and error', () => {
      test.object(appErr).contains({
        'errno': 500,
        'error': 'Server error'
      });
    });
  });
  describe('Create AppError from caught error', () => {
    let appErr;
    before('Catch error', () => {
      try {
        const foo = 1;
        foo.toJson();
      } catch (e) {
        appErr = AppError.fromError(e);
      }
    });
    it('should create a new AppError instance', () => {
      test.value(appErr).isInstanceOf(AppError);
    });
    it('AppError should have fields errno and error', (done) => {
      test.object(appErr).contains({
        'errno': 500,
        'error': 'foo.toJson is not a function'
      });
      done();
    });
  });
  describe('Create AppError from AppError', () => {
    let appErr;
    before('create error', () => {
      appErr = AppError.fromError(new AppError(404, 'Not found'));
    });
    it('should create a new AppError instance', () => {
      test.value(appErr).isInstanceOf(AppError);
    });
    it('AppError should have fields errno and error', () => {
      test.object(appErr).contains({
        'errno': 404,
        'error': 'Not found'
      });
    });
  });
  describe('Create AppError from non Error', () => {
    let appErr;
    it('should throw an Error', () => {
      test.error(() => {AppError.fromError("this is not an Error")}).match(/^Impossible to create error from a non Error object/);
    });
  });
});
