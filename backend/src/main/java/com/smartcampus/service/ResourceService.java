package com.smartcampus.service;

import com.smartcampus.model.Resource;
import com.smartcampus.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public Optional<Resource> getResourceById(String id) {
        return resourceRepository.findById(id);
    }

    public Resource createResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    public Resource updateResource(String id, Resource details) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));
        
        resource.setName(details.getName());
        resource.setType(details.getType());
        resource.setCapacity(details.getCapacity());
        resource.setLocation(details.getLocation());
        resource.setStatus(details.getStatus());
        resource.setAvailableFrom(details.getAvailableFrom());
        resource.setAvailableTo(details.getAvailableTo());
        
        return resourceRepository.save(resource);
    }

    public void deleteResource(String id) {
        resourceRepository.deleteById(id);
    }

    public List<Resource> filterResources(String type, String location, Integer capacity) {
        Query query = new Query();
        if (type != null && !type.isEmpty()) {
            query.addCriteria(Criteria.where("type").is(type));
        }
        if (location != null && !location.isEmpty()) {
            query.addCriteria(Criteria.where("location").regex(location, "i"));
        }
        if (capacity != null) {
            query.addCriteria(Criteria.where("capacity").gte(capacity));
        }
        return mongoTemplate.find(query, Resource.class);
    }
}
