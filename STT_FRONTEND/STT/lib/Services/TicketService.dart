import 'dart:convert';
import 'package:http/http.dart' as http;

class TicketService {
  static const String baseUrl =
      'http://192.168.1.166:3800/api/tickets'; // Remplacez ceci par l'URL de votre API Express.js

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

  Future<bool> checkTicketValidity(String ticketId) async {
    print(" fn checkTicketValidity ticket id=");
    print(ticketId);
    // Supprimez les guillemets doubles autour de l'ID du ticket
    ticketId = ticketId.replaceAll('"', '');
    print("2 ticket id=");
    print(ticketId);
    print("ticketId = $ticketId");
    final response =
        await http.get(Uri.parse('$baseUrl/validiteTicket/$ticketId'));

    if (response.statusCode == 200) {
      // Le ticket est valide
      return true;
    } else if (response.statusCode == 400) {
      // Le ticket n'est pas valide
      return false;
    } else {
      // Erreur lors de la vérification du ticket
      print("Erreur lors de la vérification du ticket");
      throw Exception('Erreur lors de la vérification du ticket');
    }
  }

  Future<bool> CheckTicket(String ticketId) async {
    ticketId = ticketId.replaceAll('"', '');

    final response = await http.put(Uri.parse('$baseUrl/check/$ticketId'));

    if (response.statusCode == 200) {
      // Le ticket est scanner par le controlleur
      return true;
    } else if (response.statusCode == 400) {
      // Le ticket n'est scanner par le controlleur
      return false;
    } else {
      // Erreur lors de la vérification du ticket
      throw Exception('Erreur lors de la scanne par le controlleur');
    }
  }

  /* static Future<void> createTicket(Map<String, dynamic> ticketData) async {
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
*/
  static Future<Map<String, dynamic>> createTicket(
      Map<String, dynamic> ticketData) async {
    final response = await http.post(
      Uri.parse('$baseUrl'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(ticketData),
    );

    if (response.statusCode == 200) {
      // Parse the response body to get the created ticket data
      Map<String, dynamic> ticket = jsonDecode(response.body)['result'];
      return ticket;
    } else {
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


  static Future<String> getQrCodeOfTicket(String ticketId) async {
    final response = await http.get(
      Uri.parse('$baseUrl/getQrCodeOfTicket/$ticketId'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to get QR code of ticket');
    }
    // Convertir la réponse JSON en une carte
    final Map<String, dynamic> responseData = json.decode(response.body);
    // Extraire le QR code de la carte
    final String qrCode = responseData['qr_code'];
    return qrCode;
  }

}
