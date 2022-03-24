package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;

public interface LogicExecutor {

    void execute(FieldDocument field);

}
