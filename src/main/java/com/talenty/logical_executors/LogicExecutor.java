package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;

public interface LogicExecutor {

    FieldDocument execute(FieldDocument field);

    boolean needParentField();

    void setCurrentParentField(FieldDocument field);

}