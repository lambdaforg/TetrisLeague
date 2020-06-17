package tetris.rest.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tetris.rest.api.data.CustomerSatisfactionRepository;
import tetris.rest.api.data.UserRepository;
import tetris.rest.api.model.entity.CustomerSatisfaction;
import tetris.rest.api.model.entity.Logon;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/customerSatisfaction")
public class CustomerSatisfactionRestController {

    @Autowired
    CustomerSatisfactionRepository customerSatisfactionRepository;
    @Autowired
    UserRestController userRestController;

    @GetMapping
    public List<CustomerSatisfaction> getAllCustomerSatisfactions() {
        List<CustomerSatisfaction> list = new ArrayList<CustomerSatisfaction>();
        customerSatisfactionRepository.findAll().forEach(list::add);
        return list;
    }

    @GetMapping("/{userId}/{date}/{assesment}")
    public CustomerSatisfaction addNewCustomerSatisfaction(@PathVariable("userId") Integer userId, @PathVariable("date") String date, @PathVariable("assesment") Integer assesment) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//        Date newDate = sdf.parse(newCustomerSatisfaction.getAssesmentDate());
        System.out.println("directly " + date);
        CustomerSatisfaction customerSatisfaction = new CustomerSatisfaction();
        customerSatisfaction.setAssesingUser(userRestController.getUser(userId).asUser());
        customerSatisfaction.setAssesment(assesment);
        System.out.println(customerSatisfaction.getAssesingUser());
        System.out.println(customerSatisfaction.getAssesment());
        try {
            customerSatisfaction.setAssesmentDate(sdf.parse(date));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        System.out.println(customerSatisfaction.getAssesmentDate());
        System.out.println("App succesfully assesed");
        return customerSatisfactionRepository.save(customerSatisfaction);
    }

    @GetMapping("/getCustomerAssessments/{date1}/{date2}")
    public String[] getCustomerAssessments(@PathVariable("date1") String date1, @PathVariable("date2") String date2) {
        System.out.println("satisfaction");
        double sum = 0.0, max = 0.0;
        double result = 0.0;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date start = null;
        Date end = null;
        try {
            start = sdf.parse(date1);
            end = sdf.parse(date2);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        List<String> list = new ArrayList<>();

        System.out.println("start" + date1);
        System.out.println("end" + date2);

        if (start == null || end == null) {
            return list.toArray(new String[0]);
        }
        Date finalEnd = end;
        List<CustomerSatisfaction> customerSatisfactions = getAllCustomerSatisfactions().stream()
                .filter(satisfaction -> satisfaction.getAssesmentDate().before(finalEnd))
                .collect(Collectors.toList());

        for (int i = 0; i < customerSatisfactions.size(); i++) {
            sum += customerSatisfactions.get(i).getAssesment();
            max += 5;
            result = sum / max;
            list.add(sdf.format(customerSatisfactions.get(i).getAssesmentDate()) + "," + result);
            System.out.println(list.get(i));
        }
        return list.toArray(new String[0]);
    }
}
