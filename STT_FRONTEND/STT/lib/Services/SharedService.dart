import 'dart:convert';
import 'package:api_cache_manager/api_cache_manager.dart';
import 'package:api_cache_manager/models/cache_db_model.dart';
import 'package:flutter/material.dart';
import 'package:stt/Models/LoginResponseModel.dart';

class SharedService {
  static Future<bool> isLoggedIn() async {
    await APICacheManager().deleteCache("login_details");
    // bch ychouf if the login_details mawjoud wela lee fi cache c-a-d fama login wel lee

    var isCacheKeyExist =
        await APICacheManager().isAPICacheKeyExist("login_details");

    return isCacheKeyExist;
  }

  static Future<LoginResponseModel?> loginDetails() async {

    var isCacheKeyExist =
        await APICacheManager().isAPICacheKeyExist("login_details");
    if (isCacheKeyExist) {
      var cacheData = await APICacheManager().getCacheData("login_details");
      print("Cache data length: ${cacheData.syncData.length}");
      print("Cache data: ${cacheData.syncData}");
      return loginResponseJson(cacheData.syncData);
    } else {
      return null;
    }

  }

  static Future<void> setLoginDetails(
       loginResponse,
      ) async {
    var isCacheKeyExist =
    await APICacheManager().isAPICacheKeyExist("login_details");

    if (isCacheKeyExist) {
      var cacheData = await APICacheManager().getCacheData("login_details");
      cacheData.syncData = jsonEncode(loginResponse.toJson());
      print("Cache updated successfully");
    } else {
      APICacheDBModel cacheModel = APICacheDBModel(
        key: "login_details",
        syncData: jsonEncode(loginResponse.toJson()),
      );

      await APICacheManager().addCacheData(cacheModel);
      print("Cache added successfully");
    }
  }


  static Future<void> logout(BuildContext context) async {
    await APICacheManager().deleteCache("login_details");
    Navigator.pushNamedAndRemoveUntil(
      context,
      '/login',
      (route) => false,
    );
  }
}
