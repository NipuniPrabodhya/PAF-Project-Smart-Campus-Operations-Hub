package com.smartcampus.repository;

import com.smartcampus.model.Resource;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface ResourceRepository extends MongoRepository<Resource, String> {
    List<Resource> findByType(String type);
    List<Resource> findByLocation(String location);
    
    @Query("{ 'capacity': { $gte: ?0 } }")
    List<Resource> findByMinCapacity(Integer capacity);
}
