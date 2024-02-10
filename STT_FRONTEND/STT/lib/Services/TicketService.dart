import 'dart:convert';
import 'package:http/http.dart' as http;

class TicketService {
  static const String baseUrl =
      'http://192.168.1.16:3800/api/tickets'; // Remplacez ceci par l'URL de votre API Express.js

  static Future<List<dynamic>> getTickets() async {
    final response = await http.get(Uri.parse('$baseUrl'));
    if (response.statusCode == 200) {
      return json.decode(response.body)['result'];
    } else {
      throw Exception('Failed to load tickets');
    }
  }

  static Future<dynamic> getTicket(String ticketId) async {
    final response = await http.get(Uri.parse('$baseUrl/getTicket/$ticketId'));
    if (response.statusCode == 200) {
      return json.decode(response.body)['result'];
    } else {
      throw Exception('Failed to load ticket');
    }
  }

  static Future<void> createTicket(Map<String, dynamic> ticketData) async {
    final response = await http.post(
      Uri.parse('$baseUrl'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(ticketData),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to create ticket');
    }
  }

  static Future<void> updateTicket(
      String ticketId, Map<String, dynamic> ticketData) async {
    final response = await http.put(
      Uri.parse('$baseUrl/updateTicket/$ticketId'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(ticketData),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to update ticket');
    }
  }
}
