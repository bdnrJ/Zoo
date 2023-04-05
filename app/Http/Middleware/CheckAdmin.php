<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();

        error_log("x");

        if (!$user || !$user->role) {
            return response()->json(['message' => 'You do not have permission to access this.'], 401);
        }

        return $next($request);
    }
}
