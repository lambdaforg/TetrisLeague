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
}
