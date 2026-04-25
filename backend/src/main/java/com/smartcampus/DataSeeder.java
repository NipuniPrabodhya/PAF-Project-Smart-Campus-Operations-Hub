package com.smartcampus;

import com.smartcampus.model.Resource;
import com.smartcampus.model.ResourceStatus;
import com.smartcampus.repository.ResourceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(ResourceRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                Resource hall1 = new Resource(null, "Main Lecture Hall", "LECTURE_HALL", 250, "Building A, Floor 1", ResourceStatus.ACTIVE, "08:00", "18:00");
                Resource lab1 = new Resource(null, "Advanced Robotics Lab", "LAB", 30, "Innovation Center", ResourceStatus.ACTIVE, "09:00", "17:00");
                Resource projector = new Resource(null, "Epson 4K Projector", "EQUIPMENT", 1, "Media Store", ResourceStatus.ACTIVE, "08:30", "16:30");
                Resource lab2 = new Resource(null, "Chemistry Lab B", "LAB", 25, "Building C, Floor 2", ResourceStatus.OUT_OF_SERVICE, "08:00", "18:00");
                
                repository.saveAll(Arrays.asList(hall1, lab1, projector, lab2));
                System.out.println("Sample assets seeded successfully into smartcampus database!");
            }
        };
    }
}
