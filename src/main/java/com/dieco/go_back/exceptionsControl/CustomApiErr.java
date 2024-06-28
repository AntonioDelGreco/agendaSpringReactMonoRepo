package com.dieco.go_back.exceptionsControl;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomApiErr {
    private Integer errorCode;
    private String errorMessage;
}