package com.example.demo.security.service;
import com.example.demo.model.Income;
import com.example.demo.model.MonthlySummary;
import com.example.demo.model.User;
import com.example.demo.payload.request.IncomeRequest;
import com.example.demo.payload.response.IncomeResponse;
import com.example.demo.payload.response.MonthlyIncomeSummaryResponse;
import com.example.demo.repository.IncomeRepository;
import com.example.demo.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;
@Service
public class IncomeService {


@Autowired
IncomeRepository incomeRepository;
@Autowired
FormatAmountService formatAmountService;
@Autowired
private JwtUtils jwtUtils;
@Autowired
UserDetailsServiceImpl userDetailsService;


//Gelir ekle fonksiyonu
public IncomeResponse addIncome(String token , IncomeRequest incomeRequest) {
    User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
    if (authenticatedUser != null) {
        Income income = new Income();
        authenticatedUser = userDetailsService.getUser(authenticatedUser.getId());
        income.setIncomeName(incomeRequest.getIncomeName());
        income.setAmount(incomeRequest.getAmount());
        income.setIncomeDate(incomeRequest.getIncomeDate());
        income.setUser(authenticatedUser);
        incomeRepository.save(income);
        incomeRequest.setAmount(income.getAmount());
        incomeRequest.setIncomeName(income.getIncomeName());
        incomeRequest.setUserId(income.getUser().getId());
        incomeRequest.setIncomeDate(income.getIncomeDate());
    }
  return showIncomeResponse(incomeRequest);

}

//Kullanıcnın gelirlerini gösteren fonksiyon
/*public List<IncomeResponse> showIncome(String token){
        User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        if(authenticatedUser != null) {
    List<Income> userIncomes = incomeRepository.findByUser(authenticatedUser);
            List<IncomeRequest> incomeRequests = userIncomes.stream()
                    .map(income -> {
                        IncomeRequest request = new IncomeRequest();
                        request.setIncomeName(income.getIncomeName());
                        request.setAmount(income.getAmount());
                        request.setUserId(income.getUser().getId());
                        request.setIncomeDate(income.getIncomeDate());
                        return request;
                    })
                    .collect(Collectors.toList());
            return showIncomeResponseList(incomeRequests);
        }
       return null;
    } */
    public List<IncomeResponse> showIncome(String token){
        User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        if(authenticatedUser != null) {
            List<Income> userIncomes = incomeRepository.findByUser(authenticatedUser);
            List<IncomeResponse> incomeRequests = userIncomes.stream()
                    .map(income -> {
                      IncomeResponse request = new IncomeResponse();
                        request.setIncomeName(income.getIncomeName());
                        request.setAmount(formatAmountService.formatAmount(income.getAmount()));
                        request.setUserId(income.getUser().getId());
                        request.setIncomeDate(income.getIncomeDate());
                        request.setId(income.getId());
                        return request;
                    })
                    .collect(Collectors.toList());
            return incomeRequests;
        }
        return null;
    }
    public List<IncomeResponse> showIncomeMonth (String token, String yearMonthKey) {
        User authtenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        if(authtenticatedUser != null) {
            List<Income> userIncomes = incomeRepository.findByUser(authtenticatedUser);
            Map<String, BigDecimal>incomeMap = new HashMap<>();
            LocalDate currentDate = LocalDate.now();
            int currentYear= currentDate.getYear();
            for (Income income : userIncomes) {
                Date incomeDate = income.getIncomeDate();

                Calendar calendar = Calendar.getInstance();
                calendar.setTime(incomeDate);
                int year = calendar.get(Calendar.YEAR);
                if(currentYear==year){
                    String yearMonthKeys = getMonth(incomeDate);
                    if(yearMonthKeys.equals(yearMonthKey)){
                        BigDecimal totalIncome = income.getAmount();
                        String incomeName = income.getIncomeName();
                        incomeMap.put(incomeName, totalIncome);
                    }
                }

            }

            List<IncomeResponse>  incomeResponses =  incomeMap.entrySet().stream()
                    .map(entry -> {
                        IncomeResponse summary = new IncomeResponse();
                        summary.setIncomeName(entry.getKey());
                        summary.setAmount(formatAmountService.formatAmount(entry.getValue()));
                        return summary;
                    })
                    .collect(Collectors.toList());

            return incomeResponses;
        }
        return null;
 }
//kullanıcının istenilen idye göre güncelleme yaptığı fonksiyon
public IncomeResponse updateIncome(String token, long incomeId, IncomeRequest incomeRequest) {
    User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);

    if (authenticatedUser != null) {

        Income existingIncome = incomeRepository.findById(incomeId).orElse(null);

        if (existingIncome != null && existingIncome.getUser().getId() == authenticatedUser.getId()) {
            existingIncome.setIncomeName(incomeRequest.getIncomeName());
            existingIncome.setAmount(incomeRequest.getAmount());
            existingIncome.setIncomeDate(incomeRequest.getIncomeDate());
            //güncellenen income
            incomeRepository.save(existingIncome);
            IncomeResponse incomeResponse = new IncomeResponse();
            incomeResponse.setIncomeName(existingIncome.getIncomeName());
            incomeResponse.setAmount(formatAmountService.formatAmount(existingIncome.getAmount()));
            incomeResponse.setId(existingIncome.getId());
            incomeResponse.setIncomeDate(existingIncome.getIncomeDate());

            return incomeResponse;
        }
    }

    // Eğer kullanıcı kimliği veya gelir öğesi bulunamazsa veya güncelleme yetkisi yoksa null dönebilirsiniz.
    return null;
}
//Income silme
public IncomeResponse deleteIncome(String token, long incomeId) {
    User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);

    if (authenticatedUser != null) {
        Income existingIncome = incomeRepository.findById(incomeId).orElse(null);

        if (existingIncome != null && existingIncome.getUser().getId() == authenticatedUser.getId()) {
            incomeRepository.delete(existingIncome);
            IncomeResponse incomeResponse = new IncomeResponse();
            incomeResponse.setIncomeName(existingIncome.getIncomeName());
            incomeResponse.setAmount(formatAmountService.formatAmount(existingIncome.getAmount()));
            incomeResponse.setId(existingIncome.getId());
            incomeResponse.setIncomeDate(existingIncome.getIncomeDate());
            incomeResponse.setUserId(existingIncome.getUser().getId());
            return incomeResponse;
        }
    }

    return null;
}


    /*  public UpdateIncomeResponse updateIncome(String token, long incomeId, IncomeRequest incomeRequest){
        User authtenticatedUser= userDetailsService.getAuthenticatedUserFromToken(token);
        if(authtenticatedUser != null) {
            Income existingIncome = incomeRepository.findById(incomeId).orElse(null);

            if (existingIncome != null && existingIncome.getUser().getId() == authtenticatedUser.getId()) {
                existingIncome.setIncomeName(incomeRequest.getIncomeName());
                existingIncome.setAmount(incomeRequest.getAmount());
                existingIncome.setIncomeDate(incomeRequest.getIncomeDate());
                //güncellenen income
                incomeRepository.save(existingIncome);
                UpdateIncomeResponse incomeResponse = new UpdateIncomeResponse();
                incomeResponse.setIncomeName(existingIncome.getIncomeName());
                incomeResponse.setAmount(existingIncome.getAmount());
                incomeResponse.setId(existingIncome.getId());
                incomeResponse.setDate(existingIncome.getIncomeDate());

                return incomeResponse;
            }
        }
        return null;
    }*/
    public ResponseEntity<?> showListIncome (String token) {
    User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
    Map<String, BigDecimal> monthlyIncomeMap = new HashMap<>(); //burada her ay için geliri hesaplayacaksın
    if(authenticatedUser!= null) {
        List<Income> userIncomes = incomeRepository.findByUser(authenticatedUser);
        for(Income income : userIncomes) {
            Date incomeDate = income.getIncomeDate(); // Gelir tarihi Date türünde
            LocalDate localDate = incomeDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate(); // Date'i LocalDate'ye dönüştürme
            String yearMonthKey = localDate.getYear() + "-" + localDate.getMonthValue();
            BigDecimal currentMonthTotal = monthlyIncomeMap.getOrDefault(yearMonthKey, BigDecimal.ZERO);
            currentMonthTotal = currentMonthTotal.add(income.getAmount()); // Geliri toplama ekle
            monthlyIncomeMap.put(yearMonthKey, currentMonthTotal);
        }
    }
    return ResponseEntity.ok(monthlyIncomeMap);
    }

 //Kullanıcın toplam gelirini hesaplayan fonksiyon
    public ResponseEntity<?> totalIncome (String token){
    User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
        BigDecimal total = BigDecimal.ZERO;
        if(authenticatedUser != null) {
            List<Income> userIncomes = incomeRepository.findByUser(authenticatedUser);
            for(Income income : userIncomes) {
                total = total.add(income.getAmount());
            }

            Map<String ,String> response = new HashMap<>();
            response.put("totalIncome",formatAmountService.formatAmount(total) );
            return ResponseEntity.ok(response);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kimlik doğrulama başarısız.");
        }

    }

    public BigDecimal totalIncomeBudget (String token) {
    User authtenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
    BigDecimal total = BigDecimal.ZERO;
    if(authtenticatedUser != null) {
        List<Income> userIncomes = incomeRepository.findByUser(authtenticatedUser);
        for(Income income: userIncomes){
            total = total.add(income.getAmount());
        }
    }
    return total;
    }


    //burada IncomeResponseListe şeklindeki çevirildi.
    public List <IncomeResponse> showIncomeResponseList (List <IncomeRequest> incomeRequest) {
        List<IncomeResponse> incomeResponses = incomeRequest.stream()
                .map(request -> {
                    IncomeResponse response = new IncomeResponse();
                    response.setIncomeName(request.getIncomeName());

                    response.setAmount(formatAmountService.formatAmount(request.getAmount()));
                    response.setIncomeDate(request.getIncomeDate());
                    return response;
                })
                .collect(Collectors.toList());

        return incomeResponses;


    }

    //burada IncomeResponse çevrildi.
    public IncomeResponse showIncomeResponse(IncomeRequest incomeRequest){
    IncomeResponse incomeResponse = new IncomeResponse();
    incomeResponse.setIncomeName(incomeRequest.getIncomeName());
    incomeResponse.setAmount(formatAmountService.formatAmount(incomeRequest.getAmount()));
    incomeResponse.setIncomeDate(incomeRequest.getIncomeDate());
     return incomeResponse;
    }
 //Income aylık toplam  geliri hesaplama
 public List<MonthlyIncomeSummaryResponse> getMonthlyIncomeSummary(String token) {
       User authenticatedUser = userDetailsService.getAuthenticatedUserFromToken(token);
     if (authenticatedUser == null) {
         return null;
     }

     List<Income> userIncomes = incomeRepository.findByUser(authenticatedUser);
     Map<String, BigDecimal> monthlySummaries = new HashMap<>();
     Map<String,MonthlySummary> summaryMap = new HashMap<>();
     LocalDate currentDate = LocalDate.now();
     int currentYear= currentDate.getYear();
     userIncomes.forEach(income -> {
         Date date = income.getIncomeDate();
         Calendar calendar = Calendar.getInstance();
         calendar.setTime(date);
         int year = calendar.get(Calendar.YEAR);
         if(currentYear == year) {
         String yearMonthKey = getYearMonthKey(income.getIncomeDate());
         BigDecimal totalIncome = monthlySummaries.getOrDefault(yearMonthKey, BigDecimal.ZERO);
         totalIncome = totalIncome.add(income.getAmount());
         monthlySummaries.put(yearMonthKey, totalIncome);
       /*  MonthlySummary summary = summaryMap.getOrDefault(yearMonthKey, new MonthlySummary());
         summary.setYearMonthKey(yearMonthKey);
         summary.setTotalIncome(income.getAmount());
         summary.setIncomeName(income.getIncomeName());*/

         }
     });

     List<MonthlyIncomeSummaryResponse> result = monthlySummaries.entrySet().stream()
             .map(entry -> {
                 MonthlyIncomeSummaryResponse summary = new MonthlyIncomeSummaryResponse();
                 summary.setYearMonthKey(entry.getKey());
                 summary.setTotalIncome(entry.getValue());
                 return summary;
             })
             .collect(Collectors.toList());

     return result;
 }


    private String getYearMonthKey(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH) + 1;
        return year + "-" + (month < 10 ? "0" + month : month);
    }

    private String getMonth (Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int month = calendar.get(Calendar.MONTH)+1;
        String monthAsString = (month < 10 ? "0" + month : String.valueOf(month));

        return monthAsString;
    }

}





