package com.dieco.go_back.exceptionsControl;

import com.dieco.go_back.exceptionsControl.exceptions.ResourceNotFoundException;
import com.dieco.go_back.exceptionsControl.exceptions.ResourceDuplicateException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class ControllerErrResponses {

//    @ExceptionHandler(MissingServletRequestParameterException.class)
//    protected ResponseEntity<Object> handleNullParamsException(MissingServletRequestParameterException ex, WebRequest request){
//        CustomApiError err = new CustomApiError();
//        String paramName = (ex.getParameterName().isEmpty()) ? "sinParametro" : ex.getParameterName();
//        if (paramName.contains("sinParametro")){
//            err.setErrorMessage("No es posible dejar el campo vacio.");
//            return handleExceptionInternal(ex, err, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
//        }
//        String errMessage = "No puede faltar el parametro '" + paramName + "'.";
//        err.setErrorMessage(errMessage);
//        return handleExceptionInternal(ex, err, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
//    }
//
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    protected ResponseEntity<Object> handleArgsException(MethodArgumentNotValidException ex, WebRequest request){
//        String errMessage = ex.getBindingResult().getFieldError().getDefaultMessage();
//        CustomApiError err = new CustomApiError();
//        err.setErrorMessage(errMessage);
//        return handleExceptionInternal(ex, err, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
//    }
//
//    @ExceptionHandler(ConstraintViolationException.class)
//    protected ResponseEntity<Object> handleArgsNotModelException(ConstraintViolationException ex, WebRequest request){
//        CustomApiError err = new CustomApiError();
//        String errMessage = null;
//        for ( ConstraintViolation violation : ex.getConstraintViolations()) {
//            errMessage = violation.getMessage();
//        }
//        err.setErrorMessage(errMessage);
//        return handleExceptionInternal(ex, err, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
//    }
//
//    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
//    protected ResponseEntity<Object> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex, WebRequest request) {
//        CustomApiError err = new CustomApiError();
//
//        if (ex.getRequiredType() == Integer.class) {
//            err.setErrorMessage("No puede pasar una letra en el URL, debe de ser un número entero.");
//            return handleExceptionInternal(ex, err, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
//        }
//
//        err.setErrorMessage("Hubo un error en el servidor.");
//        return handleExceptionInternal(ex, err, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
//    }

    @ExceptionHandler(value = {ResourceNotFoundException.class})
    protected ResponseEntity<Object> handleControllerExceptionsNotFound(Exception ex, WebRequest request){
        String exceptionMessage = ex.getMessage();
        CustomApiErr error = new CustomApiErr();
        error.setErrorCode(HttpStatus.NOT_FOUND.value());
        error.setErrorMessage(exceptionMessage);
        return handleExceptionInternal(ex, error, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(value = {ResourceDuplicateException.class})
    protected ResponseEntity<Object> handleControllerExceptionsConflict(Exception ex, WebRequest request){
        String exceptionMessage = ex.getMessage();
        CustomApiErr error = new CustomApiErr();
        error.setErrorCode(HttpStatus.CONFLICT.value());
        error.setErrorMessage(exceptionMessage);
        return handleExceptionInternal(ex, error, new HttpHeaders(), HttpStatus.CONFLICT, request);
    }

    protected ResponseEntity<Object> handleExceptionInternal(
            Exception ex,
            @Nullable Object body,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request
    ) {
        if (body == null) {
            CustomApiErr error = new CustomApiErr();
            error.setErrorCode(status.value());
            error.setErrorMessage(ex.getMessage());
            body = error;
        }

        return new ResponseEntity<>(body, headers, status);
    }
}