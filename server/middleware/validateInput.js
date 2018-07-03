import {
  stripRequestBody,
  trimRequestBody,
  isAWord,
  isDoubleSpaced
} from '../helpers/checkInput';
import validateEmail from '../helpers/validateEmail';

/**
 * @class ValidateInput
 *
 * @classdesc Validates user input
 *
 */
class ValidateInput {
  /**
   * @description Validates payload payload during signup
   *
   * @param { object } req request object
   * @param { object } res response object
   * @param { object } next passes control to next middleware
   *
   * @returns { object | function } http object or next call
   */
  static signupValidator(req, res, next) {
    req.body = stripRequestBody(req.body);
    const { username, password, email } = req.body;

    if (!username || username === '' || typeof username !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Username is required!'
      });
    }

    if (username.length < 2 || username.length > 20) {
      return res.status(400).json({
        success: false,
        message: 'Username length should be between 6 and 20!'
      });
    }

    if (!email || email === '') {
      return res.status(400).json({
        success: false,
        message: 'Email is required!'
      });
    }

    if (email && !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email is not valid!'
      });
    }

    if (!password || password === '') {
      return res.status(400).json({
        success: false,
        message: 'Password is required!'
      });
    }

    if (password.length < 6 || password.length > 20) {
      return res.status(400).json({
        success: false,
        message: 'Password length should be between 6 and 20!'
      });
    }
    next();
  } // signUpValidator

  /**
   * @description Validates payload during login
   *
   * @param { object } req request object
   * @param { object } res response object
   * @param { object } next passes control to next middleware
   *
   * @returns { object | function } http object or next call
   */
  static loginValidator(req, res, next) {
    req.body = trimRequestBody(req.body);
    const { email, password } = req.body;

    if (!email || email === '' || typeof email !== 'string') {
      return res.status(400).json({
        sucesss: false,
        message: 'Email is required!'
      });
    }

    if (!password || password === '' || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Password is required!'
      });
    }
    next();
  } // loginValidator

  /**
   * @description Validates the id parameter
   *
   * @param { object } req request object
   * @param { object } res response object
   * @param { object } next passes control to next middleware
   *
   * @returns { object | function } http res object or next call
   */
  static paramIdValidator(req, res, next) {
    const paramKeys = Object.keys(req.params);
    const paramKey1 = paramKeys[0];
    const id = Number(req.params[paramKey1]);
    // const id = parseInt(req.params[paramKey1], 10);

    if ((id && typeof id !== 'number') || !Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: 'Id should be an integer'
      });
    }

    if (Number(id).toString().length > 9) {
      // if (parseInt(id, 10).length > 9) {
      return res.status(400).json({
        success: false,
        message: 'Parameter too long'
      });
    }

    next();
  } // paramIdValidator

  /**
   * @description Validates payload when ceating or updating a center
   *
   * @param { object } req request object
   * @param { object } res response object
   * @param { object } next passes control to next middleware
   *
   * @returns { object | function } http res object or next call
   */
  static centerPayloadValidator(req, res, next) {
    const { name, location, capacity, price } = req.body;

    if (req.method === 'POST' && (!name || name === '')) {
      return res.status(400).json({
        success: false,
        message: 'Center name is required!'
      });
    }

    if (name && isDoubleSpaced(name)) {
      return res.status(400).json({
        success: false,
        message: 'Name is not correctly formatted!'
      });
    }

    if (name && typeof name !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Center name cannot be a number!'
      });
    }

    if (name && name.length > 20) {
      return res.status(400).json({
        success: false,
        message: 'Center name cannot exceed 20 characters!'
      });
    }

    if (req.method === 'POST' && (!location || location === '')) {
      return res.status(400).json({
        success: false,
        message: 'Center location is required!'
      });
    }

    if (location && typeof location !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Center location cannot be a number!'
      });
    }

    if (location && location.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Center location cannot exceed 50 characters!'
      });
    }

    if (req.method === 'POST' && (!price || price === '')) {
      return res.status(400).json({
        success: false,
        message: 'Center price is required!'
      });
    }

    if (price && isNaN(price)) {
      return res.status(400).json({
        success: false,
        message: 'Center price should be a number!'
      });
    }

    if (req.method === 'POST' && (!capacity || capacity === '')) {
      return res.status(400).json({
        success: false,
        message: 'Center capacity is required!'
      });
    }

    if (capacity && isNaN(capacity)) {
      return res.status(400).json({
        success: false,
        message: 'Center capacity should be a number!'
      });
    }

    next();
  }

  static eventPayloadValidator(req, res, next) {
    const { title, notes, centerId, date } = req.body;

    if (req.method === 'POST' && (!title || title === '')) {
      return res.status(400).json({
        success: false,
        message: 'Title is required!'
      });
    }

    if (title && isDoubleSpaced(title)) {
      return res.status(400).json({
        success: false,
        message: 'Title is not correctly formatted!'
      });
    }

    if (title && typeof title !== 'string') {
      console.log(typeof title);
      return res.status(400).json({
        success: false,
        message: 'Title should be a string!'
      });
    }

    if (title && title.length > 20) {
      return res.status(400).json({
        success: false,
        message: 'Event title cannot exceed 20 characters!'
      });
    }

    // notes

    if (notes && typeof notes !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Notes should be a string!'
      });
    }

    if (notes && !isAWord(notes)) {
      return res.status(400).json({
        success: false,
        message: 'Notes should be a word!'
      });
    }

    if (notes && notes.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Note cannot exceed 100 characters!'
      });
    }

    // centerId

    if (req.method === 'POST' && (!centerId || centerId === '')) {
      return res.status(400).json({
        success: false,
        message: 'Center is required!'
      });
    }

    if (centerId && isNaN(centerId)) {
      return res.status(400).json({
        success: false,
        message: 'CenterID should be an integer!'
      });
    }

    // date

    if (req.method === 'POST' && (!date || date === '')) {
      return res.status(400).json({
        success: false,
        message: 'Date is required!'
      });
    }

    next();
  }
} // ValidateInput

export default ValidateInput;
