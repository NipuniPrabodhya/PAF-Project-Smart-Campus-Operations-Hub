package com.smartcampus.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "resources")
public class Resource {
    @Id
    private String id;
    private String name;
    private String type; // e.g., LECTURE_HALL, LAB, EQUIPMENT
    private Integer capacity;
    private String location;
    private ResourceStatus status;
    private List<AvailabilityWindow> availabilityWindows;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AvailabilityWindow {
        private String dayOfWeek;
        private String startTime; // HH:mm
        private String endTime;   // HH:mm
    }
}
