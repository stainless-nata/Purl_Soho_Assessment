<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JWTMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        if(!$token) {
            return response()->json(['error' => 'Token not provided'], 401);
        }

        try {
            JWTAuth::setToken($token);

            $user = JWTAuth::parseToken()->authenticate();
        } catch(JWTException $e) {
            return response()->json(['error' => 'Token is not valid'], 401);
        }
        
        return $next($request);
    }
}
