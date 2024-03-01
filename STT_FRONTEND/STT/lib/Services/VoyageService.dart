import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:stt/Models/VoyageModel.dart';

class VoyageService {
  List<Voyage> voyages = [];
  static const String baseUrl =
      'http://192.168.218.211:3800/api/voyages'; // Remplacez l'URL par l'URL de votre serveur

  static Future<List<dynamic>> getVoyages() async {
    final response = await http.get(Uri.parse('$baseUrl/getVoyages'));
    if (response.statusCode == 200) {
      return json.decode(response.body)['result'];
    } else {
      throw Exception('Failed to load voyages');
    }
  }

  static Future<dynamic> getVoyage(String voyageId) async {
    final response = await http.get(Uri.parse('$baseUrl/getVoyage/$voyageId'));
    if (response.statusCode == 200) {
      return json.decode(response.body)['result'];
    } else {
      throw Exception('Failed to load voyage');
    }
  }

  static Future<void> createVoyage(Map<String, dynamic> voyageData) async {
    final response = await http.post(
      Uri.parse('$baseUrl/createVoyage'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(voyageData),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to create voyage');
    }
  }

  static Future<void> updateVoyage(
      String voyageId, Map<String, dynamic> voyageData) async {
    final response = await http.put(
      Uri.parse('$baseUrl/updateVoyage/$voyageId'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(voyageData),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to update voyage');
    }
  }

  static Future<String> getVoyageByVilleDateTime(
      Map<String, String> filterParams) async {
    final response = await http.post(
      Uri.parse('$baseUrl/getVoyageByVilleDateTime'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(filterParams),
    );
    if (response.statusCode == 200) {
      final dynamic data =
          json.decode(response.body)['voyageId']; // Modifier ici
      return data;
    } else {
      throw Exception('Failed to get voyage by ville and datetime');
    }
  }

  static Future<List<Voyage>> getVoyagesByDate(String date) async {
    final response = await http.post(
      Uri.parse('$baseUrl/getVoyagesByDate'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({'date': date}),
    );

    if (response.statusCode == 200) {
      final dynamic data = json.decode(response.body)['result'];
      List<Voyage> voyages =
          (data as List).map((item) => Voyage.fromJson(item)).toList();
      return voyages;
    } else {
      throw Exception('Failed to get voyages by date');
    }
  }

  Future<double> getPriceByVoyage(String voyageId) async {
    final response = await http.get(
      Uri.parse(
          '$baseUrl/p/$voyageId'), // Assuming your API expects the voyageId in the URL
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    if (response.statusCode == 200) {
      final dynamic rawPrice = json.decode(response.body)['prix'];

      // Explicitly cast to double
      final double price = rawPrice is int ? rawPrice.toDouble() : rawPrice;
      return price;
    } else {
      throw Exception('Failed to get price of a voyage');
    }
  }

  Future<List<String>> getUniqueHoursOfVoyages(
      String date, String villeDepart, String villeArrive) async {
    final response = await http.get(
      Uri.parse('$baseUrl/hours/$villeDepart/$villeArrive/$date'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    if (response.statusCode == 200) {
      final List<dynamic> uniqueHours =
          json.decode(response.body)['uniqueHours'];
      return List<String>.from(
          uniqueHours); // Convert dynamic list to string list
    } else {
      throw Exception('Failed to get unique hours of voyages');
    }
  }
}
