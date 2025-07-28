<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;
use Roles;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $logged = Auth::user();
        if (!$logged || $logged->role != Roles::ADMIN) {
            if ($logged && $logged->role == Roles::OPERATOR)
                return redirect()->route("dashboard.operator");
            if ($logged && $logged->role == Roles::DELIVER)
                return redirect()->route("dashboard.deliver");

            return redirect()->route("login");
        }
        return $next($request);
    }
}
