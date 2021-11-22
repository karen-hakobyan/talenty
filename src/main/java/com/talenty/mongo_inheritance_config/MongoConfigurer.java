package com.talenty.mongo_inheritance_config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(
        value = {"com.talenty.repository", "com.talenty.mongo_inheritance_config"},
repositoryBaseClass = InheritanceAwareSimpleMongoRepository.class,
repositoryFactoryBeanClass = InheritanceAwareMongoRepositoryFactoryBean.class)
public class MongoConfigurer {

}