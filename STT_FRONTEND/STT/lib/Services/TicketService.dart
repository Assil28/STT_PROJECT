import 'dart:convert';
import 'dart:typed_data';
import 'package:http/http.dart' as http;
import 'package:image_downloader/image_downloader.dart';
import 'package:stt/Models/TicketModel.dart';

class TicketService {
  static const String baseUrl =
      'http://192.168.1.15:3800/api/tickets'; // Remplacez ceci par l'URL de votre API Express.js

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
*/
  static Future<Map<String, dynamic>> createTicket(
      Map<String, dynamic> ticketData) async {
    try {
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

        // Check if the ticket contains a 'qr_code' URL
        if (ticket.containsKey('qr_code')) {
          // Save the QR code image to the gallery
          final result = await saveQrCodeToGallery(ticket['qr_code']);
          if (result['isSuccess']) {
            print('QR code image saved to gallery successfully');
          } else {
            print('Failed to save QR code image to gallery');
          }
        } else {
          print('Ticket does not contain a QR code URL');
        }

        return ticket;
      } else {
        throw Exception('Failed to create ticket');
      }
    } catch (error) {
      print('Error creating ticket: $error');
      throw Exception('Failed to create ticket');
    }
  }

  static Future<Map<String, dynamic>> saveQrCodeToGallery(
      String qrCodeUrl) async {
    try {
      // Fetch the image bytes from the QR code URL
      var imageId = await ImageDownloader.downloadImage(qrCodeUrl);

      if (imageId == null) {
        // Handle the case where the image download failed
        print('Image download failed');
        return {'isSuccess': false};
      } else {
        // Handle the case where the image download succeeded
        print('Image downloaded with id: $imageId');
        return {'isSuccess': true};
      }
    } catch (error) {
      // Handle errors during the download process
      print('Error downloading image: $error');
      return {'isSuccess': false};
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
