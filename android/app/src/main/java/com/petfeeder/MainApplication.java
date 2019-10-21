package com.petfeeder;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
import com.horcrux.svg.SvgPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNGestureHandlerPackage(),
          new AsyncStoragePackage(),
          new LottiePackage(),
          new ImagePickerPackage(),
          new VectorIconsPackage(),
          new ReactNativeFirebaseAppPackage(),
          new ReactNativeFirebaseMessagingPackage(),
          new SvgPackage(),
          new ReanimatedPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
